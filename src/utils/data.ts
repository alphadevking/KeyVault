export { testimonials, features, heroTilted, faqs, type HeroTilted };

interface HeroTilted {
    icon: string;
    title: string;
    description: string;
}

const testimonials = [
    {
        name: "Alice Johnson",
        feedback: "KeyVault has revolutionized how I manage my passwords. It's secure, easy to use, and I can access it from anywhere!",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        office: {
            name: "cornix",
            locale: "",
            position: "md/ceo",
            icon: "https://static.thenounproject.com/png/1902233-512.png",
        },
    },
    {
        name: "Michael Ron",
        feedback: "I love the strong password generator feature. It gives me peace of mind knowing that my accounts are secure.",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        office: {
            name: "kaggle",
            locale: "",
            position: "cto",
            icon: "https://static.thenounproject.com/png/7162263-512.png",
        },
    },
    {
        name: "Sophia Martinez",
        feedback: "The interface is intuitive and the performance is top-notch. Highly recommend KeyVault for anyone looking to secure their digital life.",
        avatar: "https://randomuser.me/api/portraits/women/70.jpg",
        office: {
            name: "mezora",
            locale: "",
            position: "md/ceo",
            icon: "https://static.thenounproject.com/png/6620412-512.png",
        },
    },
    {
        name: "David Leonardo",
        feedback: "KeyVault has become an essential tool for my daily life. The ability to store and manage passkeys securely is fantastic.",
        avatar: "https://randomuser.me/api/portraits/men/88.jpg",
        office: {
            name: "sinclair",
            locale: "",
            position: "coo",
            icon: "https://static.thenounproject.com/png/7162263-512.png",
        },
    },
];

const features = [
    {
        title: "Secure Password Storage",
        description: "Store your passwords securely with end-to-end encryption. Access them anytime, anywhere with confidence.",
        image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400"
    },
    {
        title: "Strong Password Generator",
        description: "Generate strong, unique passwords for all your accounts. Ensure your online security with robust passwords.",
        image: "https://images.unsplash.com/photo-1584433144859-1fc0a6251c4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400"
    },
    {
        title: "Cross-Platform Access",
        description: "Access your passwords and passkeys across multiple devices. Enjoy seamless synchronization and convenience.",
        image: "https://images.unsplash.com/photo-1584697964407-5f1a5c6e62a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDl8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400"
    },
    {
        title: "User-Friendly Interface",
        description: "Navigate through our intuitive and user-friendly interface. Experience hassle-free password management.",
        image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDMyfHx1c2VyJTIwaW50ZXJmYWNlfGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400"
    },
];

const heroTilted: HeroTilted[] = [
    {
        title: "Secure Password Storage",
        description: "Store your passwords securely with end-to-end encryption. Access them anytime, anywhere with confidence.",
        icon: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
        title: "Strong Password Generator",
        description: "Generate strong, unique passwords for all your accounts. Ensure your online security with robust passwords.",
        icon: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
        title: "Cross-Platform Access",
        description: "Access your passwords and passkeys across multiple devices. Enjoy seamless synchronization and convenience.",
        icon: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
        title: "User-Friendly Interface",
        description: "Navigate through our intuitive and user-friendly interface. Experience hassle-free password management.",
        icon: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fHNlY3VyaXR5fGVufDB8fHx8MTY4MDY4NzA4Mw&ixlib=rb-1.2.1&q=80&w=400",
    },
];

const faqs = [
    {
        title: "What is this app, and how does it work?",
        text: "This app helps you securely store and manage your passwords and passkeys. It uses advanced encryption techniques to ensure your data is safe, while offering seamless access across your devices.",
        image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHx0ZWNofGVufDB8fDB8fHww",
    },
    {
        title: "Is my data secure with this app?",
        text: "Yes, your data is encrypted using industry-standard methods such as AES-256 encryption. We also ensure zero-knowledge architecture, meaning we cannot access your passwords, even if we wanted to.",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHRlY2h8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "Does the app support cross-device synchronization?",
        text: "Absolutely! Your data is securely synced across all your devices, ensuring you always have access to your passwords, whether you're on your phone, tablet, or computer.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHRlY2h8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "What happens if I forget my master password?",
        text: "Your master password is the key to accessing your encrypted data. For security reasons, we cannot recover it for you. However, you can set up recovery options like backup codes or biometric access.",
        image: "https://images.unsplash.com/photo-1480506132288-68f7705954bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx0ZWNofGVufDB8fDB8fHww",
    },
    {
        title: "Can I share passwords securely with others?",
        text: "Yes, our app allows you to securely share passwords with trusted individuals using encrypted sharing links or access permissions.",
        image: "https://plus.unsplash.com/premium_photo-1666997726532-33f671ca24c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMzfHx0ZWNofGVufDB8fDB8fHww",
    }
];
