// option api for cart
import { defineStore } from "pinia";
import Swal from 'sweetalert2';

export const cartApiOption = defineStore('cartOptionApi', {
    state: () => ({
        carts: [],
        loading: false,
        error: null,
        productNotification: [],
        cartNotification: [],
    }),

    getters: {
        cartSubTotal: (state) => state.carts.reduce((sum, product) => sum + product.price, 0),
        isInCart: (state) => (product) => { return state.carts.find(item => item.id === product.id) }
    },
    actions: {
        fetchCart() {
            this.loading = true;
            try {
                return this.carts;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }

        },

        addCart(product) {

            const productExist = this.carts.find(item => item.id === product.id)

            if (productExist) {
                productExist.qty += 1;
                this.productNotification = "product added to cart";
            } else {
                product.qty = 1;
                this.carts.push(product);
                this.productNotification = "product added to cart";
            }

        },

        clearCart() {
            
            if (this.carts.length != 0) {

                
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You want to clear your cart!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, clear it!'
                }).then((result) => {
                    
                    if (result.isConfirmed) {
                        this.carts.length = 0;
                        this.cartNotification = 'Cart has been cleared';

                        Swal.fire(
                            'Cleared!',
                            'Your cart is now empty.',
                            'success'
                        );
                    }
                });
            }
        },

        removeFromCart(product) {
            if (product.id) {
                const index = this.carts.findIndex(item => item.id === product.id);

                if (index !== -1) {
                    this.carts.splice(index, 1);
                }
            }
        }

    }
})