$(function () {


    let totalCost = 0;
    let inCartItems = [];

    // timer
    var infoTimeout;

    // rendering the table
    const render = function (items) {
        $('modal').modal('hide');
        $('#sale-items').empty();

        //appending each item to the sale-items #
        items.forEach(function (item) {
            $('#sale-items').append(renderItemRow(item));
        });
    }

    //api call and render
    const getItems = function () {
        $.get('/api/products').then(render);
    }

    const renderItemRow = function (item) {
        const tr = $('<tr>');

        const input = $('<input>').attr({
            type: 'number',
            min: 0,
            id: item.id
        });
        // add to cart button
        const button = $('<button>')
            .addClass('btn btn-warning add-to-cart')
            .text('Add to Cart')
            .attr('data-id', item.id);

        //appending items to the div
        tr.append(
            $('<td>').text(item.product_name),
            $('<td>').text(`$${item.price}`),
            $('<td>').text(item.stock_quantity),
            $('<td>').append(input),
            $('<td>').append(button)
        );
        return tr;
    }

    const addCartRow = function (qty, item) {
        const itemsTotal = item.price * qty;

        totalCost += itemsTotal;

        item.stock_quantity -= qty;

        inCartItems.push(item);

        const tr = $('<tr>').addClass(`cart-${item.id}`);

        tr.append(
            $('<td>').text(qty),
            $('<td>').text(item.product_name),
            $('<td>').text(`$${item.price}`),
            $('<td>').text(`$${itemsTotal.toFixed(2)}`)
        );

        $('#cart-items').append(tr);
        $('.cart-total').text(`$${totalCost.toFixed(2)}`);
    }

    const message = function (type, text) {
        $('#messages')
            .addClass(`alert alert-${type}`)
            .text(text);

        // timeout for error message
        infoTimeout = setTimeout(clearMessages, 5000);
    }

    // clear messages when items added to cart
    const clearMessages = function () {
        $('#messages').empty().removeClass();
    }

    // id to variable and make api call
    const addItemToCart = function () {

        clearMessages();
        const id = $(this).attr('data-id');

        // running the update cart func
        $.get(`/api/products/${id}`).then(updateCart);
    }

    const updateCart = function (data) {
        const requestedQty = $(`#${data.id}`).val();

        // comparison to check quantity and if not enough then error
        if (requestedQty > data.stock_quantity) {
            message('danger', ` Only ${data.stock_quantity} in stock. Choose within that range.`);
        } else {
            addCartRow(requestedQty, data);
            message('success', 'Items successfully added to cart!');
            $(`#${data.id}`).val('');
        }
    }

    function updateItem(i) {
        if (i >= 0) {

            $.ajax({
                method: 'PUT',
                url: `/api/products/${inCartItems[i].id}`,
                data: inCartItems[i]
            }).then(function (data) {
                index = index - 1;
                updateItem(index);
            });
        }
        
        getItems();
    }

    function calculateTotal() {
        
        let total = 0;
        inCartItems.forEach(e => {
            total += e.price
        })
        $('.cart-total').text(total);
    }

    const checkout = function () {
        
        calculateTotal();
        const index = inCartItems.length - 1;
        updateItem(index);
        $('.modal-body').empty();
        $('.modal-body').append("Purchase approved!");
        //clearMessages();
        location.reload();
    }

    getItems();

    $('#sale-items').on('click', '.add-to-cart', addItemToCart);
    $('#checkout').on('click', checkout);
    $('#close').on('click', getItems);
    
});