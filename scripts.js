// MODEL
// var index = this.collection.indexOf(Cars);

var Car = Backbone.Model.extend({
  defaults: {
    serial: '',
    brand: '',
    model: '',
    year: ''
  }
})

// COLLECTION

var Cars = Backbone.Collection.extend({});

// instantiate two Cars
var car1 = new Car({
  serial: '1',
  brand: 'Ford',
  model: 'Figo',
  year: '2016'
})

var car2 = new Car({
  serial: '2',
  brand: 'VW',
  model: 'Polo',
  year: '2014'
})

var car3 = new Car({
  serial: '3',
  brand: 'Toyota',
  model: 'Corolla',
  year: '2015'
})

var car4 = new Car({
  serial: '4',
  brand: 'Hyundai',
  model: 'i20',
  year: '2016'
})

// instantiate a collection

var cars = new Cars([car1, car2, car3, car4])

// VIEWS
// For one car
var CarView = Backbone.View.extend({
  model: new Car(),
  tagName: 'tr',
  initialize: function() {
    this.template = _.template($('.cars-list-template').html())
  },
  events: {
    'click .edit-car': 'edit',
    'click .update-car': 'update',
    'click .cancel': 'cancel',
    'click .delete-car': 'delete'
  },
  edit: function() {
    $('.edit-car').hide();
    $('.delete-car').hide();
    this.$('.update-car').show();
    this.$('.cancel').show();

    var serial = this.$('.serial').html()
    var model = this.$('.model').html()
    var year = this.$('.year').html()
    var brand = this.$('.brand').html()

    this.$('.serial').html('<input type="text" class="form-control serial-update" value="' + serial + '">')
    this.$('.model').html('<input type="text" class="form-control model-update" value="' + model + '">')
    this.$('.year').html('<input type="text" class="form-control year-update" value="' + year + '">')
  },
  // update: function() {
  //   this.model.set('serial', $('.serial-update').val())
  //   this.model.set('model', $('.model-update').val())
  //   this.model.set('year', $('.year-update').val())
  //   this.model.set('brand', $('.brand-update').val())
  // },
  cancel: function() {
    carsView.render()
  },
  delete: function() {
    this.model.destroy()
  },
  update: function() {
    this.model.set({'serial':this.$('.serial-update').val(),
			'model':this.$('.model-update').val(),
      'brand':this.$('.brand-update').val(),
			'year':this.$('.year-update').val()});
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()
    ))
    return this;
  }
})

// VIEWS for all cars
var CarsView = Backbone.View.extend({
  model: cars,
  el: $('.cars-list'),
  initialize: function() {
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function() {
        self.render();
    }, this)
    this.model.on('remove', this.render, this)
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(car) {
      self.$el.append((new CarView({model: car})).render().$el);
    })
    return this;
  }
})

var carsView = new CarsView();


$(document).ready(function() {
  carsView.render().el
  var i = 5
  $('.add-car').on('click', function() {

    console.log(i)
    var car = new Car ({
      serial: i++,
      brand: $('.brand-input').val(),
      model: $('.model-input').val(),
      year: $('.year-input').val()
    })

    $('.brand-input').val('');
    $('.model-input').val('');
    $('.year-input').val('');
    console.log(car.toJSON());
    cars.add(car);

  })
})
