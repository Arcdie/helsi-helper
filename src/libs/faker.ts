import faker from 'faker';

export const getFakeFirstName = () => faker.name.firstName();
export const getFakeLastName = () => faker.name.lastName();

export const getFakeEmail = () => faker.internet.email();

export const getFakeAmericanPhoneNumber = () => faker.phone.phoneNumber('+17#########');

export const getFakeStreet = () => faker.address.streetAddress(false);
