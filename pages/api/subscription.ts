import { requireAuth } from "@clerk/nextjs/api";
import { subscriptionHandler } from "use-stripe-subscription";
import { findOrCreateCustomerId } from "../../utils/findOrCreateCustomerId";

const handler = requireAuth(async (req, res) => {
  // Determine the Stripe Customer ID for this request
  // use-stripe-subscription doesn't care how you implement this...
  // you can make it specific to the user, or specific to their organization
  // but we implemented it here with Clerk for user management
  const customerId = await findOrCreateCustomerId({
    clerkUserId: req.auth.userId,
  });

  res.json(
    await subscriptionHandler({ customerId, query: req.query, body: req.body })
  );
});

export default handler;
