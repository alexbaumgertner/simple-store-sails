/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ProductController.index()`
     */
    index: function(req, res) {
        Product.find(function(err, products) {

            products = [
                {
                    header: '1',
                    image: '1.jpg',
                    theme: 'theme 1',
                    annotation: 'annotation 1',
                    content: 'content 1',
                    isbn: 'isbn 1',
                    price: 'price 1'
                },
                {
                    header: '2',
                    image: '2.jpg',
                    theme: 'theme 2',
                    annotation: 'annotation 2',
                    content: 'content 2',
                    isbn: 'isbn 2',
                    price: 'price 2'
                }
            ];

            // TODO: pass controller/action another way
            res.render({data: {products: products}, controller: 'product', action: 'index'});
        });
    },

    /**
     * `ProductController.show()`
     */
    show: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: product, page: 'product'});
        });
    },

    /**
     * `ProductController.create()`
     */
    create: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();

                if (file && file[0] && file[0].fd) {
                    productData.image = file[0].fd.split('/').pop();
                }

                // TODO: rewrite
                Product.create(productData, function(err, product) {
                    if (err) return next(err);

                    res.status(201);
                    res.redirect('/product/' + product.id);
                });

            });

    },

    /**
     * `ProductController.edit()`
     */
    edit: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: {product: product}, page: 'product-edit'});
        });
    },

    /**
     * `ProductController.new()`
     */
    'new': function(req, res) {
        res.render({data: {product: {}}, page: 'product-new'});
    },

    /**
     * `ProductController.update()`
     */
    update: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();

                if (file && file[0] && file[0].fd) {
                    productData.image = file[0].fd.split('/').pop();
                }

                Product.update(req.param('id'), productData, function(err, product) {
                    if (err) res.redirect('/product/' + req.param('id') + '/edit');

                    res.status(201);
                    res.redirect('/product/' + req.param('id'));
                });

            });
    },

    /**
     * `ProductController.delete()`
     */
    'delete': function(req, res, next) {
        var productId = req.param('id');

        Product.findOne({id: productId}, function(err, product) {

            Product.delete({id: productId}, function(err) {
                next();
            });

        });
    }
};

