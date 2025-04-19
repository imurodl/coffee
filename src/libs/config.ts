export const AUTH_TIMER = 6;

export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};



/* Product Types, Details: 

1. Coffee Type
	•	Ground Coffee
	•	Whole Bean
	•	Pods (K-Cups, Nespresso)
	•	Instant Coffee

2. Roast Type
	•	Light Roast
	•	Medium Roast
	•	Dark Roast
	•	Espresso Roast

3. Flavor Profile
	•	Fruity
	•	Nutty
	•	Chocolatey
	•	Spicy
	•	Floral
	•	Earthy

4. Coffee Origin / Region
	•	Ethiopian
	•	Colombian
	•	Brazilian
	•	Guatemalan
	•	Kenyan
	•	Sumatra
	•	Hawaiian

5. Price Range
	•	Under $10
	•	$10 - $20
	•	$20 - $40
	•	$40+

6. Brewing Method / Equipment
	•	Drip Coffee Makers
	•	French Press
	•	Espresso Machines
	•	Cold Brew Makers
	•	Grinders

7. Decaf / Caffeine Level
	•	Decaf
	•	Low Caffeine
	•	Medium Caffeine
	•	High Caffeine

8. Sustainability Certifications
	•	Fair Trade
	•	Organic
	•	Rainforest Alliance Certified
	•	Direct Trade

9. Additives (If You Offer Consumables)
	•	Syrups
	•	Creamers
	•	Sugar Alternatives
	•	Flavor Infused Coffees

10. Subscription Option
	•	Subscription Available
	•	One-Time Purchase

11. Pack Size
	•	Small Pack (Under 250g)
	•	Medium Pack (250g - 500g)
	•	Large Pack (500g+)

12. Special Categories
	•	Best Sellers
	•	New Arrivals
	•	Limited Edition
*/
