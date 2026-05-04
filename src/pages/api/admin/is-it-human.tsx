import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dashboardUrl = process.env.HUMAN_OR_BOT_DASHBOARD_URL;
  const adminKey = process.env.HUMAN_OR_BOT_ADMIN_KEY;

  if (!dashboardUrl || !adminKey) {
    return res.status(500).json({
      error: "Missing dashboard env vars",
      hasDashboardUrl: Boolean(dashboardUrl),
      hasAdminKey: Boolean(adminKey),
    });
  }

  try {
    const response = await fetch(dashboardUrl, {
      method: "GET",
      headers: {
        "x-admin-key": adminKey,
      },
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Lambda dashboard failed",
        status: response.status,
        body: text,
      });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (error: any) {
    return res.status(500).json({
      error: "Dashboard proxy failed",
      message: error.message,
    });
  }
}