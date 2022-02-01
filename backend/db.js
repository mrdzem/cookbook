import mongoose from "mongoose";

 const connection = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect("mongodb+srv://coma5302:Szczypior17@cookbookcluster.xoock.mongodb.net/sample_restaurants?retryWrites=true&w=majority", connectionParams);
		
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};

export default connection