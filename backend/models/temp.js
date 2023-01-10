[
    {
      '$match': {
        'product': new ObjectId('63b059a275462308a4cf218f')
      }
    }, {
      '$group': {
        '_id': null, 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numOfReviews': {
          '$sum': 1
        }
      }
    }
  ]