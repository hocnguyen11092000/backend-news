SELECT
  `comment`.`id`,
  `comment`.`content`,
  `comment`.`parentId`,
  `comment`.`hasChild`,
  `comment`.`createdAt`,
  `comment`.`updatedAt`,
  `comment`.`post_id`,
  `comment`.`user_id`,
  `user`.`id` AS `user.id`,
  `user`.`name` AS `user.name`,
  `user`.`email` AS `user.email`,
  `user`.`password` AS `user.password`,
  `user`.`role` AS `user.role`,
  `user`.`avatar` AS `user.avatar`,
  `user`.`createdAt` AS `user.createdAt`,
  `user`.`updatedAt` AS `user.updatedAt`,
  `like`.`id` AS `like.id`,
  `like`.`name` AS `like.name`,
  `like`.`image` AS `like.image`,
  `like`.`image_id` AS `like.image_id`,
  `like`.`createdAt` AS `like.createdAt`,
  `like`.`updatedAt` AS `like.updatedAt`,
  `like`.`comment_id` AS `like.comment_id`,
  `like`.`user_id` AS `like.user_id`,
  `like->user`.`id` AS `like.user.id`,
  `like->user`.`name` AS `like.user.name`,
  `like->user`.`email` AS `like.user.email`,
  `like->user`.`password` AS `like.user.password`,
  `like->user`.`role` AS `like.user.role`,
  `like->user`.`avatar` AS `like.user.avatar`,
  `like->user`.`createdAt` AS `like.user.createdAt`,
  `like->user`.`updatedAt` AS `like.user.updatedAt`
FROM
  `comments` AS `comment`
  LEFT OUTER JOIN `users` AS `user` ON `comment`.`user_id` = `user`.`id`
  LEFT OUTER JOIN `likes` AS `like` ON `comment`.`id` = `like`.`comment_id`
  LEFT OUTER JOIN `users` AS `like->user` ON `like`.`user_id` = `like->user`.`id`
WHERE
  (
    `comment`.`post_id` = '30'
    AND `comment`.`parentId` = 0
  );