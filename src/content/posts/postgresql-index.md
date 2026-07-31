---
title: "PostgreSQL 인덱스, 정말 이해하고 있나요?"
date: 2026-07-10
readTime: 15
excerpt: "B-tree, GIN, BRIN, partial index. 각 인덱스가 어떤 쿼리 패턴에 최적화되어 있는지, 그리고 EXPLAIN 결과를 어떻게 해석해야 하는지 정리합니다."
category: "Backend"
tags: ["PostgreSQL", "Database", "Performance"]
thumbnail: "/uploads/postgresql-index.png"
authorName: "Minjun Lee"
authorInitials: "ML"
featured: false
---

B-tree, GIN, BRIN, partial index. 각 인덱스가 어떤 쿼리 패턴에 최적화되어 있는지, 그리고 EXPLAIN 결과를 어떻게 해석해야 하는지 정리합니다.

(본문 내용은 추후 CMS를 통해 직접 작성/보완해주세요. 이 글은 마이그레이션 과정에서 만들어진 placeholder 본문입니다.)
