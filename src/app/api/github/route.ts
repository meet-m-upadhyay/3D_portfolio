import { NextResponse } from 'next/server';

export async function GET() {
  const PAT = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  const username = 'meet-m-upadhyay';

  try {
    // Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: PAT ? { Authorization: `Bearer ${PAT}` } : {},
      next: { revalidate: 3600 }
    });
    if (!userRes.ok) throw new Error('Failed to fetch user');
    const userData = await userRes.json();

    // Fetch repos to calculate language stats
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: PAT ? { Authorization: `Bearer ${PAT}` } : {},
      next: { revalidate: 3600 }
    });
    if (!reposRes.ok) throw new Error('Failed to fetch repos');
    const reposData = await reposRes.json();

    // Calculate language distribution
    const langCount: Record<string, number> = {};
    let totalStars = 0;
    
    for (const repo of reposData) {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count || 0;
    }

    // Sort languages by count and take top 6
    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / reposData.length) * 100)
      }));

    // Get recent repos (top 6)
    const recentRepos = reposData
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || "No description",
        language: repo.language || "Unknown",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        updatedAt: repo.updated_at,
      }));

    return NextResponse.json({
      profile: {
        name: userData.name || username,
        bio: userData.bio,
        avatar: userData.avatar_url,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        profileUrl: userData.html_url,
      },
      totalStars,
      languages,
      recentRepos,
    });
  } catch (error) {
    return NextResponse.json({
      profile: { name: 'meet-m-upadhyay', publicRepos: 0, followers: 0, following: 0, profileUrl: 'https://github.com/meet-m-upadhyay' },
      totalStars: 0,
      languages: [],
      recentRepos: [],
    }, { status: 500 });
  }
}
