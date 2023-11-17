const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const newRest = await Restaurant.create(seedRestaurant[0])
        expect(newRest.name).toEqual("AppleBees")
    });

    test('can create a Menu', async () => {
        const newMenu = await Menu.create(seedMenu[0])
        expect(newMenu.title).toEqual("Breakfast")
    });

    test('can find Restaurants', async () => {
        const allRests = await Restaurant.findAll()
        expect(allRests.length).toEqual(1)
    });

    test('can find Menus', async () => {
        const allMenus = await Menu.findAll()
        expect(allMenus.length).toEqual(1)
    });
    
    test('can update Restaurants', async () => {
        const rest = await Restaurant.create(seedRestaurant[1])
        await rest.update({cuisine: "Korean BBQ"})
        expect(rest.cuisine).toEqual("Korean BBQ")
    });

    test('can update Menus', async () => {
        const menu = await Menu.create(seedMenu[1])
        await menu.update({title: "Brunch"})
        expect(menu.title).toEqual("Brunch")
    });

    test('can delete Restaurants', async () => {
        const del = await Restaurant.destroy({where: {id: 1}})
        expect(del).toEqual(1)
    });
    
    test('can delete Menus', async () => {
        const del = await Menu.destroy({where: {title: "Brunch"}})
        expect(del).toEqual(1)
    });

    test('menus to a restaurant association', async () => {
        await Restaurant.bulkCreate(seedRestaurant)
        await Menu.bulkCreate(seedMenu)
        const allMenus = await Menu.findAll()
        const appleBees = await Restaurant.findOne({where: {name: "AppleBees"}})
        await appleBees.addMenus([allMenus[1], allMenus[2], allMenus[3]])
        const apple = await Restaurant.findOne({where: {name: "AppleBees"}, include: Menu})
        expect(apple.menus.length).toBe(3)
    })
    
    test('menus to items association', async () => {
        const dinnerMenu = await Menu.findOne({where: {title: "Dinner"}, include: Item})
        await Item.bulkCreate([
            {name: "Pie", image: "pie_img", prie: 5, vegetarian: true},
            {name: "Steak", image: "steak_img", prie: 15, vegetarian: false},
            {name: "Pulled Pork", image: "PP.jpeg", prie: 12, vegetarian: false}
        ])
        const allItems = await Item.findAll()
        await dinnerMenu.addItems(allItems)
        const newMenu = await Menu.findOne({where: {title: "Dinner"}, include: Item})
        expect(newMenu.items.length).toBe(3)
    })


})