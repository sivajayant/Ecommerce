const express = require('express');
const router = express.Router();
const {database} = require('../config/helpers');




/* GET home page. */
router.get('/', function(req, res, ) {

  let page = (req.query.page !==  undefined && req.query.page !== 0) ? req.query.page : 1;
  let limit = (req.query.limit !==  undefined && req.query.limit !== 0) ? req.query.limit : 10;

  let startValue;
  let endValue;

  if (page>0){
    startValue = (page*limit) - limit;
    endValue = page * limit;

  }
  else {
    startValue = 0;
    endValue = 10;

  }
database.table('products as p')
  .join([{
    table: 'categories as c',
    on : 'c.id = p.cat_id',
  }])
    .withFields(['c.title as category',

        'p.title as name',
        'p.price',
        'p.quantity',
        'p.description',
        'p.image',
        'p.id'


    ])

    .slice(startValue, endValue)
    .sort({id:.1})
    .getAll()
    .then(prods => {
      if (prods.length > 0){
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      }else{
        res.json({message: 'No Products Found'});

      }

    }).catch(err => console.log(err));




});

router.get('/:prodId' ,(req,res) => {

    let productId = req.params.prodId;
    console.log(productId);



    database.table('products as p')
        .join([{
            table: 'categories as c',
            on : 'c.id = p.cat_id',
        }])
        .withFields(['c.title as category',

            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.images',
            'p.id'


        ])

        .filter({'p.id' : productId})
        .get()
        .then(prods => {
            if (prods){
                res.status(200).json(prods);
            }else{
                res.json({message: `No Products Found with product id ${productId}`});

            }

        }).catch(err => console.log(err));

});


// get all products from a category
router.get('/category/:catName', (req,res) => {

    let page = (req.query.page !==  undefined && req.query.page !== 0) ? req.query.page : 1;
    let limit = (req.query.limit !==  undefined && req.query.limit !== 0) ? req.query.limit : 10;

    let startValue;
    let endValue;

    if (page>0){
        startValue = (page*limit) - limit;
        endValue = page * limit;

    }
    else {
        startValue = 0;
        endValue = 10;

    }

    const cat_title = req.params.catName;
    database.table('products as p')
        .join([{
            table: 'categories as c',
            on : `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
        }])
        .withFields(['c.title as category',

            'p.title as name',
            'p.price',
            'p.quantity',
            'p.description',
            'p.image',
            'p.id'


        ])

        .slice(startValue, endValue)
        .sort({id: 1})
        .getAll()
        .then(prods => {
            if (prods.length > 0){
                res.status(200).json({
                    count: prods.length,
                    products: prods
                });
            }else{
                res.json({message: `No Products Found from ${cat_title} category.`});

            }

        }).catch(err => console.log(err));


}) ;

module.exports = router;
