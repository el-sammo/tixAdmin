var db = (new Mongo()).getDB('grub2you');

var twentyFourAgo = new Date(new Date().getTime() - 86400000);

db.orders.update({'updatedAt': {$lt: twentyFourAgo}}, {$set: {'orphaned': true}}, {multi: true});
	
