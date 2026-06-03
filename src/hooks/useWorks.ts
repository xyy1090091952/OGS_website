/**
 * 数据访问 Hook
 * 后续若切换 API，只需改本文件，组件无需变动（数据管理层抽象）
 */
import { useMemo } from "react";
import { works } from "@/data/works";
import { profile } from "@/data/profile";
import { services } from "@/data/services";
import { clients } from "@/data/clients";
import { WORK_CATEGORIES, type Work, type WorkCategory } from "@/data/types";

// 获取个人信息
export function useProfile() {
  return profile;
}

// 获取所有作品（可按分类过滤）
export function useWorks(category: WorkCategory = WORK_CATEGORIES.ALL): Work[] {
  return useMemo(() => {
    if (category === WORK_CATEGORIES.ALL) return works;
    return works.filter((w) => w.category === category);
  }, [category]);
}

// 通过 slug 查询单个作品
export function useWork(slug?: string) {
  return useMemo(() => {
    if (!slug) return null;
    const idx = works.findIndex((w) => w.slug === slug);
    if (idx === -1) return null;
    return {
      work: works[idx],
      // 上下篇导航：环形（最后一个的下一个是第一个）
      prev: works[(idx - 1 + works.length) % works.length],
      next: works[(idx + 1) % works.length],
    };
  }, [slug]);
}

// 获取服务能力
export function useServices() {
  return services;
}

// 获取合作品牌
export function useClients() {
  return clients;
}
