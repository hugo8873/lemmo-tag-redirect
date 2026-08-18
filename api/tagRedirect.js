export default async function handler(req, res) {
  const { customer_id, customer_email, tag } = req.query;

  // ========== 改成你的真实地址 ==========
  const ZAPIER_HOOK = "https://hooks.zapier.com/hooks/catch/21644115/4tmbq9n/";
  const TARGET_REDIRECT_URL = "https://www.kickstarter.com/projects/lemmothree/lemmo-three-an-intelligent-all-purpose-vehicle-for-life";
  // =====================================

  if (!customer_id) {
    return res.status(400).send("missing customer_id parameter");
  }

  fetch(
    `${ZAPIER_HOOK}?customer_id=${encodeURIComponent(customer_id)}&customer_email=${encodeURIComponent(customer_email)}&tag=${encodeURIComponent(tag)}`
  ).catch(() => {});

  res.writeHead(302, {
    Location: TARGET_REDIRECT_URL,
  });
  res.end();
}
