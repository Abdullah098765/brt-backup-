import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
      firstname: String,
      lastname: String,
      bio: {
            type: String,
            default: "Sharing my journey of success and joy on Bragtime! Let's inspire and be inspired."
      },
      workOrSchool: String,
      bragname: {
            type: String,
            lowercase: true,
            default: null
      },
      email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
      },
      phoneNumber: {
            type: String,
      },
      country: {
            type: String,
            default: ""
      },
      age: {
            type: String,
            default: ""
      },
      level: {
            type: Number,
            default: 1
      },
      wins: {
            type: Number,
            default: 0
      },
      creditCard: {
            type: Object,
            default: null,
            cardNumber: {
                  type: String,
            },
            cardHolderName: {
                  type: String,
            },
            expiryDate: {
                  type: String,
            },
            cvc: {
                  type: String,
            },
      },
      loses: {
            type: Number,
            default: 0
      },
      gender: {
            type: String,
            default: ""
      },
      profilePicture: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/bragtime-d87ef.appspot.com/o/profilePic%2FProfilePictureUploadersd.jpg?alt=media&token=5bdb3f47-f110-4ae4-9ff9-c2841d27db00"
      },
      bio: {
            type: String,
            default: ""
      },
      school: {
            type: String,
            default: ""
      },
      work: {
            type: String,
            default: ""
      },
      metamaskWalletAddress: {
            type: String,
            default: null

      },
      languages: [String],
      interests: [String],
      bragtoken: {
            type: Number,
            default: ""
      },
      paymentType: String,
      nfts: String,
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
      challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
      groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
      events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
      channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
      snapshots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snapshot' }],
      // following 4 feilds should not be in other collections
      stripePayment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stripe' }],

      bankAccount: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bank' }],
      // ***
      transactionHistory: [{
            type: { type: String, enum: ['stripe', 'metamask', 'bank', 'card'], required: true },
            amount: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now },
      }],
      friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      friendRequests: [{
            from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
      }],
      friendCount: { type: Number, default: 0 },
      supporters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      supporterCount: { type: Number, default: 0 },
      supporting: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      supportingCount: { type: Number, default: 0 },
      registrationDate: {
            type: Date,
            default: Date.now,
      },
      updatedAt: Date,
}
);

const messageSchema = new mongoose.Schema({
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },

});


const conversationSchema = new mongoose.Schema({
      participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],

});

const postSchema = new mongoose.Schema({
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],

});

const photoSchema = new mongoose.Schema({
      post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
      url: { type: String, required: true },

});

const subCategorySchema = new mongoose.Schema({
      name: { type: String, required: true },
});
const categorySchema = new mongoose.Schema({
      name: { type: String, required: true },
      subCategories: [subCategorySchema],
});


const challengeSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      category: [{ type: String }],
      options: [{ type: String }],
      videoUrl: { type: String, required: true },
      subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
      participants: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            description: { type: String },
            videoUrl: { type: String },
            votes: { type: Number, default: 0 },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            comments: [{
                  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                  comment: { type: String },
                  createdAt: { type: Date, default: Date.now }
            }],
            isWinner: { type: Boolean, default: false }
      }],
      totalVotes: { type: Number, default: 0 },
      winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      prizePerVote: { type: Number, default: 1 }
});

challengeSchema.virtual('totalAmountToPay').get(function () {
      return this.totalVotes * this.prizePerVote;
});


const snapshotSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String },
      mediaUrl: { type: String, required: true },
      timer: { type: Number, enum: [5 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 6 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000] }, // Timer in milliseconds
      isPrivate: { type: Boolean, default: false },
      status: { type: String },
});

const groupSchema = new mongoose.Schema({
      name: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String },
      isPrivate: { type: Boolean, default: false },
      isPaid: { type: Boolean, default: false },
      isAgeRestricted: { type: Boolean, default: false },
      ageRestriction: { type: Number },
      isInvitationOnly: { type: Boolean, default: false },
      logoUrl: { type: String },
      bannerImageUrl: { type: String },
      updates: { type: String },
      photos: [{ type: String }],
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage' }],
      documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
      members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      likes: { type: Number },
      Subscriptions: { type: Number },
      supporterCount: { type: Number },
      supporters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      requests: { type: Number },
      requested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      amount: { type: Number },
      paidStatus: { type: Boolean, default: false },

});

const groupMessageSchema = new mongoose.Schema({
      groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
});

const documentSchema = new mongoose.Schema({
      groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
      name: { type: String, required: true },
      url: { type: String, required: true },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
      name: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String },
      isPrivate: { type: Boolean, default: false },
      isPaid: { type: Boolean, default: false },
      isAgeRestricted: { type: Boolean, default: false },
      ageRestriction: { type: Number },
      isInvitationOnly: { type: Boolean, default: false },
      logoUrl: { type: String },
      bannerImageUrl: { type: String },
      updates: { type: String },
      photos: [{ type: String }],
      messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventMessage' }],
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      location: { type: String },
      likes: { type: Number },
      attnedingCount: { type: Number },
      attending: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      supporters: { type: Number },
      requests: { type: Number },
      requested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      amount: { type: Number },
      paidStatus: { type: Boolean, default: false },

});

const eventMessageSchema = new mongoose.Schema({
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      message: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
});


const channelSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: { type: String },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      isPaid: { type: Boolean, default: false },
      isPrivate: { type: Boolean, default: false },
      videos: [{
            title: { type: String, required: true },
            description: { type: String },
            videoUrl: { type: String, required: true },
            thumbnailUrl: { type: String },
            category: { type: String, required: true },
            views: { type: Number, default: 0 },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            comments: [{
                  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                  text: { type: String, required: true },
                  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
                  createdAt: { type: Date, default: Date.now }
            }],

            createdAt: { type: Date, default: Date.now }
      }],
      live: [{
            title: { type: String, required: true },
            description: { type: String },
            videoUrl: { type: String, required: true },
            thumbnailUrl: { type: String },
            category: { type: String, required: true },
            views: { type: Number, default: 0 },
            likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            comments: [{
                  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                  text: { type: String, required: true },
                  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
                  createdAt: { type: Date, default: Date.now }
            }],

            createdAt: { type: Date, default: Date.now }
      }],
      playlists: [{
            name: { type: String, required: true },
            videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
      }],
      createdAt: { type: Date, default: Date.now }
});

const stripePaymentSchema = new mongoose.Schema({
      customerId: String,
      paymentMethodId: { type: String },
      subscriptionId: { type: String },

});


const metamaskPaymentSchema = new mongoose.Schema({
      walletAddress: { type: String },

});

const bankAccountSchema = new mongoose.Schema({
      bankName: { type: String },
      accountNumber: { type: String },
      routingNumber: { type: String },

});





const User = models.User || mongoose.model('User', userSchema);
const MessageModel = models.Message || mongoose.model('Message', messageSchema);
const ConversationModel = models.Conversation || mongoose.model('Conversation', conversationSchema);
const PostModel = models.Post || mongoose.model('Post', postSchema);
const CategoryModel = models.Category || mongoose.model('Category', categorySchema);
const SubCategoryModel = models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
const ChallengeModel = models.Challenge || mongoose.model('Challenge', challengeSchema);
const SnapshotModel = models.Snapshot || mongoose.model('Snapshot', snapshotSchema);
const GroupModel = models.Group || mongoose.model('Group', groupSchema);
const GroupMessageModel = models.GroupMessage || mongoose.model('GroupMessage', groupMessageSchema);
const GroupDocumentModel = models.Document || mongoose.model('Document', documentSchema);
const EventModel = models.Event || mongoose.model('Event', eventSchema);
const EventMessageModel = models.EventMessage || mongoose.model('EventMessage', eventMessageSchema);
const ChannelModel = models.Channel || mongoose.model('Channel', channelSchema);
const StripePaymentModel = models.stripe || mongoose.model('stripe', stripePaymentSchema);
const MetamaskPaymentModel = models.metamask || mongoose.model('metamask', metamaskPaymentSchema);
const BankModel = models.bank || mongoose.model('bank', bankAccountSchema);

export default {
      User,
      MessageModel,
      ConversationModel,
      PostModel,
      CategoryModel,
      SubCategoryModel,
      ChallengeModel,
      SnapshotModel,
      GroupModel,
      GroupMessageModel,
      GroupDocumentModel,
      EventModel,
      EventMessageModel,
      ChannelModel,
      StripePaymentModel,
      MetamaskPaymentModel,
      BankModel,
};
