import mongoose, { model } from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Please provide name'],
        maxlength:[100,'Name must not be more than 100 characters'],
    },

    price:{
        type:Number,
        required:[true,'Provide product price'],
        default:0,
    },

    description:{
        type:String,
        required:[true,'Please provide product description'],
        maxlength:[1000,'Description can not be more than 1000 characters'],
    },
    
    image:{
        type:String,
        default:'uploads/example.jpeg',
    },
    category:{
        type:String,
        required:[true,'Please provide product category'],
        enum:['office', 'kitchen', 'bedroom'],
    },
    company: {
        type: String,
        required: [true, 'Please provide company'],
        enum: {
          values: ['ikea', 'liddy', 'marcos'],
          message: '{VALUE} is not supported',
        },
      },

    colors:{
        type: [String],
      default: ['#222'],
      required: true,
    },
    featured:{
        type: Boolean,
        default: false,
    },

    freeShipping:{
        type:Boolean,
        default:false,
    },
 
    averageRating:{
        type:Number,
        default:0,
    },

    numOfReviews:{
        type:Number,
        default:0,
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
});

productSchema.pre('remove',async function(next){
    await this.model('Review').deleteMany({product:this._id})
})

productSchema.virtual('reviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false
})

export default mongoose.model("Product",productSchema)