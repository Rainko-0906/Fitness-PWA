import NodeCache from 'node-cache';

class Cache {
  private static instance: Cache;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600, // 默认缓存时间1小时
      checkperiod: 600, // 每10分钟检查过期缓存
    });
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  // 设置缓存
  public set(key: string, value: any, ttl?: number): boolean {
    return this.cache.set(key, value, ttl);
  }

  // 获取缓存
  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  // 删除缓存
  public del(key: string): number {
    return this.cache.del(key);
  }

  // 清空所有缓存
  public flush(): void {
    this.cache.flushAll();
  }

  // 获取缓存统计信息
  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export const cache = Cache.getInstance(); 