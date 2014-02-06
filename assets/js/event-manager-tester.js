(function() {

	var 
		eddActions = [
			'item_added_to_cart',
			'item_removed_from_cart',
			'cart_is_empty'
		],
		makeActionEchoListener = function(action) {
			return console.log.bind(console, action);
		}
	;

	for (var i = 0; i < eddActions.length; i++) {
		var action = 'edd_' + eddActions[i];
		wp.hooks.addAction(action, makeActionEchoListener(action), 1/* Make these listeners served first */);
	}
	
	wp.hooks
		.addAction('edd_item_added_to_cart', function(id) {
			console.log('A listener says: "Download #' + id + ' was added to cart"');
		})
		.addAction('edd_item_added_to_cart', 
			function(id) {
				console.log('Another listener says: "Download #' + id + ' was added to cart". Its context object is: ', this);
			},
			null, // default priority
			{name: 'foo'} // The listener context
		)
		.addAction('edd_item_added_to_cart',
			function(id) {
				console.log('Yet another listener says: "Download #' + id + ' was added to cart"');
			},
			9 // Custom priority
		)
	;

})();