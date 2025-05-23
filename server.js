const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Store products data
const products = [
    {
        id: 1,
        name: 'Samsung A23',
        category: 'تليفونات',
        brand: 'سامسونج',
        price: 799.99,
        description: 'هاتف ذكي بمواصفات رائعة وأداء فائق.',
        image: 'https://picsum.photos/500/300?random=1'
    },
    {
        id: 2,
        name: 'Xiaomi Note 12',
        category: 'تليفونات',
        brand: 'شاومي',
        price: 599.99,
        description: 'هاتف اقتصادي بمواصفات ممتازة وبطارية قوية.',
        image: 'https://picsum.photos/500/300?random=2'
    },
    {
        id: 3,
        name: 'LG WashPro',
        category: 'غسالات',
        brand: 'LG',
        price: 1299.99,
        description: 'غسالة أوتوماتيك بسعة كبيرة وكفاءة عالية.',
        image: 'https://picsum.photos/500/300?random=3'
    }
];

// Get all products
app.get('/api/products', (req, res) => {
    const { category, brand } = req.query;
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === brand);
    }
    
    res.json(filteredProducts);
});

// Handle chatbot product selection
app.post('/api/chatbot/select-products', (req, res) => {
    const { productNames } = req.body;
    
    // Find products that match the requested names
    const selectedProducts = products.filter(product => 
        productNames.some(name => 
            product.name.toLowerCase().includes(name.toLowerCase())
        )
    );
    
    if (selectedProducts.length > 0) {
        res.json({
            success: true,
            products: selectedProducts
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'لم يتم العثور على المنتجات المطلوبة'
        });
    }
});

// Handle order confirmation
app.post('/api/confirm-order', (req, res) => {
    const { products } = req.body;
    
    // Here you would typically:
    // 1. Validate the products
    // 2. Calculate total
    // 3. Process payment (in a real system)
    // 4. Save order to database
    
    // For now, we'll just simulate a successful order
    res.json({
        success: true,
        message: 'تم تأكيد الطلب بنجاح',
        orderId: Math.random().toString(36).substr(2, 9)
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 