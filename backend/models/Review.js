import mongoose from 'mongoose'

const ReviewSchema=new mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'Please provide review rating']
    },

    title:{
        type:String,
        trim:true,
        required:[true,'Please provide rating title'],
        maxlength:100,
    },

    comment:{
        type:String,
        required:[true,'Please provide review'],
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },

    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product'
    }

},{
    timestamps:true
});

//one review per user and product
ReviewSchema.index({user:1,product:1},{unique:true})


ReviewSchema.statics.calculateAverageRating=async function(productId){
   const result=await this.aggregate([
       {$match:{product:productId}},
       {$group:{_id:null,averageRating:{$avg:'$rating'},numOfReviews:{$sum:1}}}
   ]);
   console.log(result)
   try{
      await this.model('Product').findOneAndUpdate({_id:productId},
        {
            averageRating:Math.ceil(result[0]?.averageRating || 0),
            numOfReviews:result[0]?.numOfReviews || 0
        }
        )
   }catch(error){
    console.log(error)
   }
}

ReviewSchema.post('save',async function(){
    await this.constructor.calculateAverageRating(this.product)
})


ReviewSchema.post('remove',async function(){
    await this.constructor.calculateAverageRating(this.product)
})

export default mongoose.model('Review',ReviewSchema)