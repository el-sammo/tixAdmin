db = new Mongo().getDB('tix');

generatePIA();

function generatePIA() {

	var reservations = db.reservations.find({createdAt: {$exists: true}});
	
	reservations.forEach(function(reservation) {
		var dateStr = new Date(reservation.createdAt);
		var milli = dateStr.getTime();
		db.reservations.update(
			{
				createdAt: reservation.createdAt,
				poolId: reservation.poolId,
				entityId: reservation.entityId,
				entityName: reservation.entityName,
				customerId: reservation.customerId,
				cost: reservation.cost,
				quantity: reservation.quantity,
				total: reservation.total
			}, 
			{
				$set: {
					paymentInitiatedAt: milli
				}
			}, 
			false, 
			false
		);
	});
}
