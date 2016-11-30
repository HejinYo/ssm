create table seckill(
	seckill_id BIGINT not null auto_increment COMMENT '商品库存id',
	name VARCHAR(120) not null COMMenT '商品名称',
	number int not null COMMENT '库存数量',
	start_time timestamp not null COMMENT '秒杀开启时间',
	end_time timestamp not null comment '秒杀结束时间',
	create_time timestamp not null default current_timestamp comment '创建时间',
	primary key (seckill_id),
	key idx_start_time(start_time),
	key idx_end_time(end_time),
	key idx_create_time(create_time)
)ENGINE=INNODB auto_increment=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

INSERT into seckill(name,number,start_time,end_time)
VALUES
('200秒杀小米5s',100,'2016-09-01 00:00:00','2016-10-01 00:00:00')

create table success_killed(
	seckill_id BIGINT not null comment '秒杀商品id',
	user_phone BIGINT not null comment '用户手机号',
	state TINYINT not null default -1 comment '状态标识：-1无效 0成功 1已付款',
	create_time timestamp not null comment '创建时间',
	PRIMARY key (seckill_id,user_phone),
	key idx_create_time(create_time)

)ENGINE=INNODB DEFAULT charset=utf8 comment='秒杀成功明细表';