// export const imageUrl = (key: string) => {
//     return `https://ik.imagekit.io/wm5qehjm3/bragtime/public/${key}`
// }

export const imageUrl = (key, name) => {
    return key
        ? key?.startsWith("data:image")
            ? key
            : `https://dqzkou3id10fe.cloudfront.net/public/${key}`
        : `https://ui-avatars.com/api/?name=${encodeURI(name)}`;
};

export const placeholderUrl = (key) => {
    return key
        ? key?.startsWith("data:image")
            ? key
            : `https://dqzkou3id10fe.cloudfront.net/public/placeholder/${key}`
        : `https://dqzkou3id10fe.cloudfront.net/public/placeholder/`;

};
export const nftUrl = (key) => {
    return key
        ? key?.startsWith("data:image")
            ? key
            : `https://dqzkou3id10fe.cloudfront.net/public/nfts/${key}`
        : `https://dqzkou3id10fe.cloudfront.net/public/nfts/`;

};
export const productrUrl = (key) => {
    return key
        ? key?.startsWith("data:image")
            ? key
            : `https://dqzkou3id10fe.cloudfront.net/public/products/${key}`
        : `https://dqzkou3id10fe.cloudfront.net/public/products/`;

};
export const backgroundUrl = (key) => {
    if (key) {
        if (key.startsWith("data:image")) {
            return key;
        } else {
            return `https://dqzkou3id10fe.cloudfront.net/public/backgrounds/${key}`;
        }
    } else {
        return "https://dqzkou3id10fe.cloudfront.net/public/backgrounds/";
    }
};
export const emojiUrl = (key) => {
    if (key) {
        if (key.startsWith("data:image")) {
            return key;
        } else {
            return `https://dqzkou3id10fe.cloudfront.net/public/emojis/${key}`;
        }
    } else {
        return "https://dqzkou3id10fe.cloudfront.net/public/emojis/";
    }
};

export const discoverUrl = (key) => {
    if (key) {
        if (key.startsWith("data:image")) {
            return key;
        } else {
            return `https://dqzkou3id10fe.cloudfront.net/public/discover/${key}`;
        }
    } else {
        return "https://dqzkou3id10fe.cloudfront.net/public/discover/";
    }
};

export const giftsUrl = (key) => {
    if (key) {
        if (key.startsWith("data:image")) {
            return key;
        } else {
            return `https://dqzkou3id10fe.cloudfront.net/public/gifts/${key}`;
        }
    } else {
        return "https://dqzkou3id10fe.cloudfront.net/public/gifts/";
    }
};


export const videoUrl = (key) => {
    return key?.startsWith("data:video")
        ? key
        : `https://dqzkou3id10fe.cloudfront.net/public/${key}`;
};

export const videoTutorialUrl = (key) => {
    return key?.startsWith("data:video")
        ? key
        : `https://dqzkou3id10fe.cloudfront.net/public/videoTutorial/${key}`;
};

export function formatSubscriberCount(subscribers) {
    if (subscribers % 1000000 === 0) {
        return (subscribers / 1000000) + '';
    } else if (subscribers % 1000 === 0) {
        return (subscribers / 1000) + 'K';
    } else if (subscribers >= 1000000) {
        return (subscribers / 1000000).toFixed(1) + 'M';
    } else if (subscribers >= 1000) {
        return (subscribers / 1000).toFixed(1) + 'K';
    } else {
        return subscribers.toString();
    }
}