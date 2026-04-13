const fs = require('fs');
const path = require('path');

const categories = ['electronics', 'home', 'clothing', 'wearables', 'fitness', 'kitchen', 'gaming'];
const brands = ['Samsung', 'Apple', 'Sony', 'Nike', 'Adidas', 'Dyson', 'Philips', 'Logitech', 'Bose'];
const baseProducts = [
  'Ultra Smartphone', 'Noise Cancelling Headphones', 'Ergonomic Chair', 'Fitness Tracker',
  'Smart TV', 'Running Shoes', 'Mechanical Keyboard', 'Stand Mixer', 'Smart Bulbs', 'Drone',
  'Gaming Mouse', 'Wireless Earbuds', 'Electric Scooter', 'Smart Watch', 'Tablet Pro'
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReviews(brand, product) {
  const reviews = [];
  const count = Math.floor(Math.random() * 5) + 8; // 8 to 12
  const reviewers = ['Rahul Dravid', 'Priya K.', 'Surya N.', 'Arun M.', 'Deepa C.', 'Karthik V.'];
  
  for (let i = 0; i < count; i++) {
    const rating = Math.random() > 0.8 ? 4 : 5;
    reviews.push({
      id: `rev-${Math.floor(Math.random() * 10000)}`,
      author: randomItem(reviewers),
      avatarPrompt: `Portrait of an Indian shopper named ${randomItem(reviewers)}, modern casual clothing, blurred cafe background, hyper realistic 4k`,
      rating: rating,
      date: `2025-${String(Math.floor(Math.random()*12)+1).padStart(2, '0')}-${String(Math.floor(Math.random()*28)+1).padStart(2, '0')}`,
      text: rating === 5 ? `Absolutely incredible ${product.toLowerCase()}. As a tech enthusiast from Chennai, this perfectly fits my setup. The integration is seamless and it feels premium.` : `Really good ${product.toLowerCase()} by ${brand}. Overall satisfied but shipping took a day longer than expected. Matches my smart home setup well.`,
      verified: true,
      helpful: Math.floor(Math.random() * 50)
    });
  }
  return reviews;
}

const allProducts = [];

for (let i = 1; i <= 65; i++) {
  const brand = randomItem(brands);
  const baseName = randomItem(baseProducts);
  const category = randomItem(categories);
  const price = Math.floor(Math.random() * 800) + 99;
  const originalPrice = price + Math.floor(Math.random() * 200) + 50;
  
  const reviewsData = generateReviews(brand, baseName);
  const avgRating = (reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length).toFixed(1);

  allProducts.push({
    id: `prod-${i}`,
    name: `${brand} ${baseName} Series X`,
    category: category,
    brand: brand,
    price: price,
    originalPrice: originalPrice,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
    rating: parseFloat(avgRating),
    reviewCount: reviewsData.length,
    description: `Experience the pinnacle of ${category} engineering with the ${brand} ${baseName}. Carefully curated for your specific ecosystem overlapping your recent purchases. The fluid integration maps seamlessly onto your digital profile established from previous devices. Equipped with state-of-the-art sensory overlays and durable build quality, this piece is future-proofed. Perfect companion to your previously logged tech stack, offering an unparalleled aesthetic matching the premium minimalist dark-mode themes you often acquire. Designed with both hyper-productivity and luxury in mind.`,
    features: [
      'Next-generation quantum integration',
      'Seamless multi-device connectivity',
      'Premium ultra-durable materials',
      'AI-driven personalization logic'
    ],
    specifications: {
      Weight: `${(Math.random() * 2 + 0.5).toFixed(1)} kg`,
      Dimensions: 'Compact Form Factor',
      Warranty: '2 Year Global',
      Connectivity: 'Bluetooth 5.4 / WiFi 7'
    },
    imagePrompts: [
      `Studio lighting, 8K resolution, hyper-realistic ${brand} ${baseName}, clean white background, futuristic minimalist design, highly detailed macro photography`,
      `Lifestyle photography of someone using the ${brand} ${baseName} in a modern luxury apartment overlooking the Marina Beach in Chennai at sunset, warm natural lighting`,
      `Close-up in-use action shot of the ${brand} ${baseName}, dynamic angle, showing the premium metallic texture and glowing indicator lights`,
      `Abstract cinematic macro shot of the ${brand} ${baseName} surface materials, shallow depth of field, dramatic moody lighting, 8k render`
    ],
    reviews: reviewsData,
    tags: [category, 'premium', 'ai-ready', brand.toLowerCase()],
    matchesHistory: `Perfect companion to your smart ecosystem devices you purchased last year. The ${brand} architecture connects natively to your existing network.`
  });
}

const outputContent = `// AUTO-GENERATED PRODUCT CATALOG
export const products = ${JSON.stringify(allProducts, null, 2)};
`;

const dirPath = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(path.join(dirPath, 'products.js'), outputContent, 'utf8');
console.log('Successfully generated products.js with ' + allProducts.length + ' products.');
