export const plans = [
    {
        name: 'Basic',
        description: 'Basic plan for individuals',
        price: 9.99,
        currency: 'USD',
        billingPeriod: 'monthly',
        features: { feature1: true, feature2: true },
        trialDays: 14,
        maxUsers: 1,
        sortOrder: 1,
    },
    {
        name: 'Professional',
        description: 'Professional plan for teams',
        price: 29.99,
        currency: 'USD',
        billingPeriod: 'monthly',
        features: { feature1: true, feature2: true, feature3: true },
        trialDays: 14,
        maxUsers: 5,
        sortOrder: 2,
    },
]; 