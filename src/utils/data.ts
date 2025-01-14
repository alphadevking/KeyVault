export { testimonials, features, heroTilted, type HeroTilted };

interface HeroTilted {
    icon: string;
    title: string;
    description: string;
}

const testimonials = [
    {
        name: "Alice Johnson",
        feedback: "KeyVault has revolutionized how I manage my passwords. It's secure, easy to use, and I can access it from anywhere!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Michael Smith",
        feedback: "I love the strong password generator feature. It gives me peace of mind knowing that my accounts are secure.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Sophia Martinez",
        feedback: "The interface is intuitive and the performance is top-notch. Highly recommend KeyVault for anyone looking to secure their digital life.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "David Lee",
        feedback: "KeyVault has become an essential tool for my daily life. The ability to store and manage passkeys securely is fantastic.",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg"
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
]
