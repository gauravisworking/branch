var json =
{
	house :
	{
		name : 'Sweet Home',
		id : 'vatsalya',

		scenes : [
			{
				name : 'Holidays',
				parentId : 'vatsalya'
			},
			{
				name : 'All Off',
				parentId : 'vatsalya'
			},
			{
				name : 'Morning',
				parentId : 'vatsalya'
			},
			{
				name : 'Evening',
				parentId : 'vatsalya'
			}
		],
		rooms : [
			{
				name : 'Main Hall',
				id : 'main_hall',
				icon : 'ion-ios-monitor',
				seq : '1',
				scenes : [
					{
						name : 'All On',
						parentId : 'main_hall',
						actions : [
							{
								id : 'main_hall*tube',
								state : 'checked'
							},
							{
								id : 'main_hall*bulb',
								state : 'checked'
							},
							{
								id : 'main_hall*fan',
								state : 'checked'
							}
						]
					},
					{
						name : 'All Off',
						parentId : 'main_hall',
						actions : [
							{
								id : 'main_hall*tube',
								state : ''
							},
							{
								id : 'main_hall*bulb',
								state : ''
							},
							{
								id : 'main_hall*fan',
								state : ''
							}
						]
					},
					{
						name : 'Movie',
						parentId : 'main_hall',
						actions : [
							{
								id : 'main_hall*tube',
								state : 'checked'
							},
							{
								id : 'main_hall*bulb',
								state : ''
							},
							{
								id : 'main_hall*fan',
								state : 'checked'
							}
						]
					}
				],
				points : [
					{
						name : 'Tube',
						fav : 'yes',
						sch : 'yes',
						notify : 'yes',
						id : 'main_hall*tube',
						state : 'checked',
						b : "EdgeBoard1002",
						a : [
							{
								"t" : "ON",
								"p" : "ON-53"
							},
							{
								"t" : "OFF",
								"p" : "OFF-53"
							}
						]
					},
					{
						name : 'Bulb',
						fav : 'no',
						sch : 'yes',
						notify : 'yes',
						id : 'main_hall*bulb',
						state : 'checked',
						b : "EdgeBoard1002",
						a : [
							{
								"t" : "ON",
								"p" : "ON-45"
							},
							{
								"t" : "OFF",
								"p" : "OFF-45"
							}
						]
					},
					{
						name : 'Fan',
						fav : 'yes',
						sch : 'no',
						notify : 'no',
						id : 'main_hall*fan',
						state : '',
						b : "EdgeBoard1002",
						a : [
							{
								"t" : "ON",
								"p" : "ON-39"
							},
							{
								"t" : "OFF",
								"p" : "OFF-39"
							}
						]
					}
				]
			},
			{
				name : 'Kitchen',
				id : 'kitchen',
				icon : 'ion-android-restaurant',
				seq : '2',
				scenes : [
					{
						name : 'All On',
						parentId : 'kitchen',
						actions : [
							{
								id : 'kitchen*exaust',
								state : 'checked'
							},
							{
								id : 'kitchen*fridge',
								state : 'checked'
							},
							{
								id : 'kitchen*oven',
								state : 'checked'
							}
						]
					},
					{
						name : 'All Off',
						parentId : 'kitchen',
						actions : [
							{
								id : 'kitchen*exaust',
								state : ''
							},
							{
								id : 'kitchen*fridge',
								state : ''
							},
							{
								id : 'kitchen*oven',
								state : ''
							}
						]
					},
					{
						name : 'Cooking',
						parentId : 'kitchen',
						actions : [
							{
								id : 'kitchen*exaust',
								state : 'checked'
							},
							{
								id : 'kitchen*fridge',
								state : ''
							},
							{
								id : 'kitchen*oven',
								state : ''
							}
						]
					}
				],
				points : [
					{
						name : 'Exaust',
						fav : 'no',
						notify : 'no',

						sch : 'yes',
						id : 'kitchen*exaust',
						state : 'checked'
					},
					{
						name : 'Fridge',
						fav : 'no',
						sch : 'no',
						notify : 'yes',
						id : 'kitchen*fridge',
						state : ''
					},
					{
						name : 'Oven',
						sch : 'yes',
						id : 'kitchen*oven',
						fav : 'yes',
						notify : 'yes',
						state : 'checked'
					}
				]
			},
			{
				name : 'Bed Room',
				id : 'bed_room',
				icon : 'ion-happy-outline',
				seq : '3',
				scenes : [
					{
						name : 'All On',
						parentId : 'bed_room',
						actions : [
							{
								id : 'bed_room*ac',
								state : 'checked'
							},
							{
								id : 'bed_room*night_lamp',
								state : 'checked'
							},
							{
								id : 'bed_room*balcony_light',
								state : 'checked'
							}
						]
					},
					{
						name : 'All Off',
						parentId : 'bed_room',
						actions : [
							{
								id : 'bed_room*ac',
								state : ''
							},
							{
								id : 'bed_room*night_lamp',
								state : ''
							},
							{
								id : 'bed_room*balcony_light',
								state : ''
							}
						]
					},
					{
						name : 'Night',
						parentId : 'bed_room',
						actions : [
							{
								id : 'bed_room*ac',
								state : 'checked'
							},
							{
								id : 'bed_room*night_lamp',
								state : 'checked'
							},
							{
								id : 'bed_room*balcony_light',
								state : ''
							}
						]
					}
				],
				points : [
					{
						name : 'AC',
						sch : 'no',
						fav : 'yes',
						notify : 'yes',
						id : 'bed_room*ac',
						state : ''
					},
					{
						name : 'Night Lamp',
						fav : 'no',
						notify : 'no',

						sch : 'yes',
						id : 'bed_room*night_lamp',
						state : 'checked'
					},
					{
						name : 'Balcon Light',
						fav : 'yes',
						notify : 'no',

						sch : 'no',
						id : 'bed_room*balcony_light',
						state : 'checked'
					}
				]
			}
		]

	}
};
