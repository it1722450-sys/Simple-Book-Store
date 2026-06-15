// الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    
    // تعريف المتغيرات والعناصر من واجهة الـ HTML
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');

    let cart = [];
    let total = 0;

    // إضافة حدث الضغط لكل أزرار "إضافة للسلة"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookItem = event.target.parentElement;
            const title = bookItem.querySelector('h3').innerText;
            // استخراج السعر وتحويله إلى رقم عشري
            const priceText = bookItem.querySelector('.price').innerText;
            const price = parseFloat(priceText.replace('Price: $', ''));

            // إضافة الكتاب إلى مصفوفة السلة
            addItemToCart(title, price);
        });
    });

    // دالة إضافة العنصر وتحديث الواجهة
    function addItemToCart(title, price) {
        cart.push({ title, price });
        total += price;

        updateCartUI();
    }

    // دالة تحديث شكل السلة والجدول
    function updateCartUI() {
        // 1. تحديث عداد السلة العلوي
        cartCountElement.innerText = cart.length;

        // 2. تفريغ الجدول لإعادة بنائه بناءً على التحديث الجديد
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = 
                <tr>
                    <td colspan="3" align="center">Your cart is currently empty.</td>
                </tr>
            ;
        } else {
            // إضافة العناصر الجديدة داخل الجدول
            cart.forEach((item, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = 
                    <td>${item.title}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><button type="button" class="remove-btn" style="padding: 5px 10px; background-color: #d9534f;">Remove</button></td>
                ;

                // تفعيل زر الحذف (Remove) لكل كتاب داخل السلة
                tr.querySelector('.remove-btn').addEventListener('click', () => {
                    removeItemFromCart(index, item.price);
                });

                cartItemsContainer.appendChild(tr);
            });
        }

        // 3. تحديث إجمالي السعر
        totalPriceElement.innerText = total.toFixed(2);
    }

    // دالة حذف عنصر من السلة
    function removeItemFromCart(index, price) {
        cart.splice(index, 1);
        total -= price;
        updateCartUI();
    }

    // تفعيل زر إتمام الشراء (Checkout)
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your shopping cart is empty! Please add some books first.');
        } else {
            alert(Thank you for your purchase! Total amount processed: $${total.toFixed(2)});
            // تفريغ السلة بعد الشراء
            cart = [];
            total = 0;
            updateCartUI();
        }
    });
});