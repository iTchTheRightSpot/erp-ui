import { UserDto } from '@/app/store-front/book/book-staff/book-staff.dto';
import { Page, Role } from '@/app/app.util';
import { of } from 'rxjs';

export const EMPLOYEE_ALL_USERS_ROUTE = '';

export const dummyUsers$ = () => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur distinctio doloribus et expedita natus neque officiis repellendus. Ab alias deleniti expedita numquam quisquam reiciendis, voluptas. Ab consequuntur corporis cum, cupiditate id magnam minus molestias mollitia neque nihil odio officia officiis recusandae rem sapiente sed unde vitae voluptas! Neque nisi quibusdam similique tenetur. Dolores eos in possimus quae recusandae? Commodi doloribus enim et eum expedita harum ipsa quasi reprehenderit? Cum delectus eos itaque, odio sapiente velit voluptas. Accusantium beatae consequuntur delectus dicta distinctio ea exercitationem explicabo harum ipsa iste magni placeat quae quidem rem, repudiandae rerum saepe sapiente sed sint suscipit velit voluptate voluptatem voluptatibus. Aliquid ducimus est eveniet facilis hic impedit, inventore iure iusto labore laborum minima minus placeat quod quos rem, similique sit velit voluptatem! Aut corporis culpa cumque debitis dolorum id ipsam, ipsum laboriosam laudantium minima modi nostrum obcaecati odit praesentium provident qui reprehenderit saepe unde velit vitae. Animi, commodi consequatur deleniti dolorem doloremque dolorum et eum expedita explicabo fugit harum labore mollitia quaerat sit, voluptates! A ad autem consequuntur cupiditate dicta doloremque eos eum, fugit impedit ipsa ipsum, labore magni, maiores molestiae nesciunt omnis porro praesentium qui quos repudiandae sint sit soluta suscipit tempore totam veniam vero voluptas! Asperiores at beatae, consectetur dolor excepturi iste itaque nobis optio quam qui quos repellendus repudiandae veniam voluptate voluptatibus. Eum placeat quos ratione! Atque, autem consectetur consequuntur dignissimos dolorem eligendi eos, error eum fugit illum in incidunt ipsa ipsum itaque modi nam neque nisi odio, officia quibusdam quis quisquam quo quos sit soluta sunt voluptatum. Ab accusamus distinctio error ipsa iste magni necessitatibus obcaecati quasi repudiandae! Ab amet architecto consequatur cupiditate deleniti deserunt enim eveniet fuga hic iste, quia, quos repudiandae vero. Adipisci architecto consectetur debitis id natus nostrum tempore voluptates voluptatum. Doloribus, maxime, necessitatibus! Commodi fugit in minima pariatur perferendis. Atque libero placeat quae, quia sed vero voluptates? Accusantium, animi corporis deserunt doloribus eos eum, eveniet fugiat illo ipsum modi nam nobis non quos reiciendis sunt tempora vero! Ad alias aliquid, amet aperiam at atque blanditiis consectetur corporis culpa doloremque eaque eos error esse est et eveniet explicabo fugiat ipsum laboriosam laborum magnam maxime molestias necessitatibus non nostrum, odit possimus quis, quod rem repellendus reprehenderit saepe tempore tenetur totam vel velit voluptates! Aliquid eum eveniet odit officia recusandae sit ullam vero? A, corporis, sequi! Accusantium, animi aperiam at autem consectetur cumque deserunt ducimus facilis hic illo illum ipsa magnam necessitatibus nihil nobis obcaecati officia omnis, quas quia quis sint tempora unde. Animi cum cumque cupiditate delectus doloremque dolorum, ea eum fuga fugiat incidunt laudantium magnam maxime minus molestiae natus non omnis, pariatur perferendis porro possimus qui quia quisquam quod reprehenderit sequi velit voluptatum? A alias aperiam est ex nulla officia quae, rerum soluta. Ab accusamus architecto aut, cum, cumque excepturi explicabo facilis inventore ipsa labore magnam magni nesciunt nihil nisi optio perferendis repellendus sed similique sint soluta unde veritatis voluptas. A eos facere fugiat illo modi neque nulla odit placeat possimus, provident quas, quod rem rerum temporibus ut veritatis!';

  const users: UserDto[] = [
    {
      user_id: '0',
      name: 'Bonnie Green',
      email: 'boom@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
      bio: lorem,
      display_name: 'Bonnie',
      roles: [Role.OWNER, Role.DEVELOPER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '1',
      name: 'Helene Engels',
      email: 'tony-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png',
      bio: lorem,
      display_name: 'Helene',
      roles: [Role.EMPLOYEE],
    },
    {
      user_id: '2',
      name: 'Jese Leos',
      email: 'benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
      bio: lorem,
      display_name: 'Jese',
      roles: [Role.OWNER, Role.EMPLOYEE],
    },
    {
      user_id: '3',
      name: 'Joseph Mcfall',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png',
      bio: lorem,
      display_name: 'Joseph',
      roles: [Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '4',
      name: 'Lana Byrd',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png',
      bio: lorem,
      display_name: 'Lana',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '5',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '50',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '200',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '6',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '7',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '8',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '9',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '10',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '11',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '12',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '13',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '14',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '15',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '16',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '17',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '170',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '18',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '19',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '20',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '21',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '22',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '23',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '24',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '25',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '26',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
    {
      user_id: '27',
      name: 'Neil Sims',
      email: 'phil-benjamin@email.com',
      image_key:
        'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png',
      bio: lorem,
      display_name: 'Neil',
      roles: [Role.OWNER, Role.USER, Role.EMPLOYEE],
    },
  ];

  return of<Page<UserDto>>({
    page: 0,
    size: 10,
    total_pages: users.length,
    total_elements: users.length,
    number_of_elements: users.length,
    has_previous_page: false,
    has_next_page: false,
    data: users,
    is_empty: false,
  });
};
