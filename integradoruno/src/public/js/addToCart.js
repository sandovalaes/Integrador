async function addToCart(pid) {
    const cid = '66c54b8c6213d077e9d9c154';
    const url = `http://localhost:8080/api/carts/${cid}/products/${pid}`;

    try {

        console.log("agregando")
        const response = await fetch(url, {
            method: 'POST',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Producto agregado al carrito:', data);
            alert('Producto agregado al carrito con éxito');
        } else {
            throw new Error('Error al agregar el producto al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al agregar el producto al carrito');
    }
}