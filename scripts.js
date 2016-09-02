// MODEL

var Car = Backbone.Model.extend({
  defaults: {
    brand: '',
    model: '',
    year: ''
  }
})

// COLLECTION

var Cars = Backbone.Collection.extend({});

// instantiate two Cars
// var car1 = new Car({
//   brand: 'Ford',
//   model: 'Figo',
//   year: '2016'
// })
//
// var car2 = new Car({
//   brand: 'VW',
//   model: 'Polo',
//   year: '2014'
// })

// instantiate a collection

var cars = new Cars()

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
  update: function() {
    this.model.set('serial', $('.serial-update').val())
    this.model.set('model', $('.model-update').val())
    this.model.set('year', $('.year-update').val())
    this.model.set('brand', $('.brand-update').val())
  },
  cancel: function() {
    carsView.render()
  },
  delete: function() {
    this.model.destroy()
  },
  // update: function() {
  //   this.model.set({'serial':this.$('.serial-update').val(),
	// 		'model':this.$('.model-update').val(),
	// 		'year':this.$('.year-update').val()});
  // },
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
      setTimeout(function(){
        self.render();
      }, 400)
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
  $('.add-car').on('click', function() {
    var car = new Car ({
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
// var carsView = new CarsView();
