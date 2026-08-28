module.exports = {
	apps: [
		{
			name: "landing-tracuu-vinuni",
			script: "npm run start -- -p 3002",
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
