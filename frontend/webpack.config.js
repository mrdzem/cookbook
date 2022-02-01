export default {
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react')
          },
        fallback: { 
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify")  
            // "crypto": false 
        }
        
    }
}