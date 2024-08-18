export interface IUserProfile {
    _id: string;
    age: string;
    background: string;
    bankAccount: any[]; // Replace 'any' with the appropriate type if known
    banner: string;
    bio: string;
    bragname: string;
    bragtoken: null | string; // Nullable string
    challenges: any[]; // Replace 'any' with the appropriate type if known
    channels: any[]; // Replace 'any' with the appropriate type if known
    city: string;
    country: string;
    creditCard: null | string; // Nullable string
    dateofbirth: string;
    email: string;
    events: any[]; // Replace 'any' with the appropriate type if known
    fcmToken: string;
    firstname: string;
    friendCount: number;
    friendRequests: any[]; // Replace 'any' with the appropriate type if known
    friends: any[]; // Replace 'any' with the appropriate type if known
    gender: string;
    groups: any[]; // Replace 'any' with the appropriate type if known
    interests: string[];
    languages: any[]; // Replace 'any' with the appropriate type if known
    lastname: string;
    level: number;
    loses: number;
    metamaskWalletAddress: null | string; // Nullable string
    phone: string;
    phoneNumber: string;
    photos: any[]; // Replace 'any' with the appropriate type if known
    picture: string;
    point: number;
    posts: any[]; // Replace 'any' with the appropriate type if known
    profilePicture: string;
    registrationDate: string; // Date string in ISO 8601 format
    school: string;
    snapshots: any[]; // Replace 'any' with the appropriate type if known
    state: string;
    stripePayment: any[]; // Replace 'any' with the appropriate type if known
    supporterCount: number;
    supporters: any[]; // Replace 'any' with the appropriate type if known
    supporting: any[]; // Replace 'any' with the appropriate type if known
    supportingCount: number;
    transactionHistory: any[]; // Replace 'any' with the appropriate type if known
    updatedAt: string; // Date string in ISO 8601 format
    votes: number;
    wallet: string;
    wins: number;
    work: string;
    __v: number;
}

export interface IParticipants {
    _id: string;
    challengeId: string;
    createdAt: string; // Date string in ISO 8601 format
    updatedAt: string; // Date string in ISO 8601 format
    userId: string;
    videoUrl: string;
    __v: number;
    voteCount: number;
    isVoted: boolean;
}
export interface IChallenge {
    _id: string;
    bookmark: boolean;
    bookmarkCount: number;
    challenged: boolean;
    createdAt: string; // Date string in ISO 8601 format
    description: string;
    duration: string; // Duration string in a specific format
    like: boolean;
    likeCount: number;
    likes: any[]; // Replace 'any' with the appropriate type if known
    name: string;
    owner: string;
    participants: IParticipants[]; // Replace 'any' with the appropriate type if known
    slug: string;
    start: null | string; // Nullable string
    status: string;
    updatedAt: string; // Date string in ISO 8601 format
    userId: IUserProfile[];
    __v: number;
}
