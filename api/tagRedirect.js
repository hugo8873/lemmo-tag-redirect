export default async function handler(req, res) {
  // 完全移除 customer_email，只读取 customer_id
  const { customer_id } = req.query;

  // 当前邮件模板固定打标
  const tag = "apv-teaser-ks";

  // ========== 配置项 ==========
  const ZAPIER_HOOK = "https://hooks.zapier.com/hooks/catch/21644115/4tmbq9n/";
  const TARGET_REDIRECT_URL = "https://www.kickstarter.com/projects/lemmothree/lemmo-three-an-intelligent-all-purpose-vehicle-for-life";
  // ============================

  if (!customer_id) {
    return res.status(400).send("missing customer_id parameter");
  }

  try {
    await fetch(
      `${ZAPIER_HOOK}?customer_id=${encodeURIComponent(customer_id)}&tag=${encodeURIComponent(tag)}`
    );
  } catch (err) {
    console.error("Zapier webhook failed:", err);
  }

  res.writeHead(302, {
    Location: TARGET_REDIRECT_URL,
  });
  res.end();
}
