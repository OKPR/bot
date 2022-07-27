const Database = require("@replit/database");
const dbClient = new Database();

const MASTER_DB_KEY = "SEX_COUNT";
const INDIVIDUAL_DB_KEY = "SEX_COUNT_USER";

type UserId = string;
type Users = [UserId, UserId];
type MasterSchema = Record<ReturnType<typeof hashUsers>, number>;
type IndividualSchema = Record<string, {
	sexedWith: Record<UserId, number>
}>;

const bigIntMin = (a: bigint, b: bigint) => a < b ? a : b;
const bigIntMax = (a: bigint, b: bigint) => a > b ? a : b;

const hashUsers = (users: Users) => `${bigIntMin(BigInt(users[0]), BigInt(users[1]))}_${bigIntMax(BigInt(users[0]), BigInt(users[1]))}`;

export const getSexCount = async (users: Users) => {
	const hashed = hashUsers(users);
	const value = await getSexCountAll();
	return (value[hashed]) ?? 0;
}

export const getAllIndividualSexCounts = async () => {
	const value = await dbClient.get(INDIVIDUAL_DB_KEY) ?? {};
	return value;
}

export const getIndividualSexCount = async (user: UserId) => {
	const value = await getAllIndividualSexCounts();
	return value[user] ?? {
		sexedWith: {}
	};
}

export const setSexCount = async (users: Users, count: number) => {
	const hashed = hashUsers(users);
	const globalValue = await getSexCountAll();
	globalValue[hashed] = count;
	dbClient.set(MASTER_DB_KEY, globalValue);
	{
		const all = await getAllIndividualSexCounts();
		all[users[0]] ??= {
			sexedWith: {}
		};
		all[users[1]] ??= {
			sexedWith: {}
		}
		all[users[0]].sexedWith[users[1]] = (all[users[0]].sexedWith[users[1]] ?? 0) + 1;
		all[users[1]].sexedWith[users[0]] = (all[users[1]].sexedWith[users[0]] ?? 0) + 1;
		await dbClient.set(INDIVIDUAL_DB_KEY, all);
	}
}

export const getSexCountAll = async () => {
	const value = await dbClient.get(MASTER_DB_KEY) ?? {};
	return value as MasterSchema;
}
