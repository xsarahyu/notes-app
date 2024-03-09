import { faker } from '@faker-js/faker';
import { TierIds } from '../../shared/constants.js';
// in a terminal window run `wasp db seed` to seed your dev database with mock user data
export function createRandomUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const user = {
        email: faker.internet.email({
            firstName,
            lastName,
        }),
        username: faker.internet.userName({
            firstName,
            lastName,
        }),
        createdAt: faker.date.between({ from: new Date('2023-01-01'), to: new Date() }),
        lastActiveTimestamp: faker.date.recent(),
        isAdmin: false,
        stripeId: `cus_${faker.string.uuid()}`,
        hasPaid: faker.helpers.arrayElement([true, false]),
        sendEmail: false,
        subscriptionStatus: faker.helpers.arrayElement(['active', 'canceled', 'past_due', 'deleted']),
        datePaid: faker.date.recent(),
        credits: faker.number.int({ min: 0, max: 3 }),
        checkoutSessionId: null,
        subscriptionTier: faker.helpers.arrayElement([TierIds.HOBBY, TierIds.PRO]),
    };
    return user;
}
const USERS = faker.helpers.multiple(createRandomUser, {
    count: 50,
});
export async function devSeedUsers(prismaClient) {
    try {
        await Promise.all(USERS.map(async (user) => {
            await prismaClient.user.create({
                data: user,
            });
        }));
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=usersSeed.js.map