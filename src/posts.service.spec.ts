import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    let createdPosts: Post[];

    beforeEach(() => {
      createdPosts = posts.map((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();

      expect(foundPosts).toEqual(createdPosts);
      expect(foundPosts).toHaveLength(createdPosts.length);

      // Возвращаются те же самые объекты постов
      foundPosts.forEach((post, index) => {
        expect(post).toBe(createdPosts[index]);
      });
    });

    it('should return correct posts for skip and limit options', () => {
      const foundPosts = postsService.findMany({ skip: 1, limit: 2 });

      expect(foundPosts).toEqual(createdPosts.slice(1, 3));
      expect(foundPosts).toHaveLength(2);
      expect(foundPosts[0]).toBe(createdPosts[1]);
      expect(foundPosts[1]).toBe(createdPosts[2]);
    });

    it('should skip posts if only skip option provided', () => {
      const foundPosts = postsService.findMany({ skip: 2 });

      expect(foundPosts).toEqual(createdPosts.slice(2));
      expect(foundPosts).toHaveLength(2);
      expect(foundPosts[0]).toBe(createdPosts[2]);
      expect(foundPosts[1]).toBe(createdPosts[3]);
    });

    it('should limit posts if only limit option provided', () => {
      const foundPosts = postsService.findMany({ limit: 2 });

      expect(foundPosts).toEqual(createdPosts.slice(0, 2));
      expect(foundPosts).toHaveLength(2);
      expect(foundPosts[0]).toBe(createdPosts[0]);
      expect(foundPosts[1]).toBe(createdPosts[1]);
    });

    it('should return empty array if limit is 0', () => {
      const foundPosts = postsService.findMany({ limit: 0 });

      expect(foundPosts).toEqual([]);
      expect(foundPosts).toHaveLength(0);
    });

    it('should return empty array if skip is greater than posts length', () => {
      const foundPosts = postsService.findMany({ skip: createdPosts.length + 1 });

      expect(foundPosts).toEqual([]);
      expect(foundPosts).toHaveLength(0);
    });
  });
});
