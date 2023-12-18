"use Client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CrownIcon from "@/UI/crownIcon";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getPremiumStatus } from "@/lib/getPremiumStatus";
import { useRouter } from "next/navigation";
import { getCheckoutUrl } from "@/lib/stripePayment";
import Button from "@/UI/button";

const FEATURES = [
  {
    icon: "🌟",
    title: "Upload Your Logos",
    description: "Add a professional touch with your own branding. ",
  },
  {
    icon: "🎨",
    title: "Custom Theming",
    description:
      "Tailor the look and feel of your invoices to match your brand's unique style and fonts.",
  },
  // {
  //   icon: "🖋️",
  //   title: "Custom Fonts",
  //   description:
  //     "Stand out with a wide range of font options for that extra personalization.",
  // },
  {
    icon: "📑",
    title: "Unlimited Templates",
    description:
      "Access a growing library of templates, giving you more creative freedom and efficiency.",
  },
  {
    icon: "🔍",
    title: "Beta Access to AI Features",
    description:
      "Be the first to try innovative AI-driven tools that revolutionize invoicing.",
  },
];
export default function UpgradeModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const app = initFirebase();
  const auth = getAuth(app);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      if (newPremiumStatus) setOpen(false);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  async function handleUpgrade() {
    setIsLoading(true);
    const priceId = "price_1OOQXtLtUz6ittXTdgGcK7Ad";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (isLoading) return;
          setOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="text-left relative lg:grid grid-cols-2 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-4xl">
                <div className="px-4 pb-4 pt-5  sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                      <CrownIcon />
                    </div>
                    <div className="mt-3  sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Unlock the Full Potential of Your Invoices for Just
                        <span className="text-jackOrange"> $4.99</span>
                      </Dialog.Title>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">
                          Elevate your invoicing experience with our premium
                          features!
                        </p>
                        <p className="my-2 text-sm font-medium">
                          Here&apos;s what you get with the upgrade:
                        </p>
                        <ul>
                          {FEATURES.map((feature) => (
                            <li
                              key={feature.title}
                              className="flex items-start text-sm mt-2"
                            >
                              <span className=" mr-1.5 text-lg">
                                {feature.icon}{" "}
                              </span>
                              <span>
                                <span className="font-medium">
                                  {feature.title}{" "}
                                </span>
                                <span className="text-gray-500">
                                  {feature.description}
                                </span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <Button
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      loading={isLoading}
                      onClick={handleUpgrade}
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
                <div className="hidden h-full lg:block">
                  <img src="/upgrade.png" className="h-full  object-scale-up" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
