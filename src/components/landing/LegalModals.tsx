import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: LegalModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                        Last updated: {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <h3 className="text-lg font-semibold text-foreground">1. Introduction</h3>
                        <p>
                            Welcome to Dabstack ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">2. Information We Collect</h3>
                        <p>
                            We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Names and Contact Data. We collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
                            <li>Credentials. We collect passwords, password hints, and similar security information used for authentication and account access.</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h3>
                        <p>
                            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">4. Sharing Your Information</h3>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">5. Data Safety</h3>
                        <p>
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export function TermsOfServiceModal({ isOpen, onClose }: LegalModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogDescription>
                        Last updated: {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <h3 className="text-lg font-semibold text-foreground">1. Agreement to Terms</h3>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Dabstack ("we," "us" or "our"), concerning your access to and use of the Dabstack website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">2. Intellectual Property Rights</h3>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">3. User Representations</h3>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">4. Prohibited Activities</h3>
                        <p>
                            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>

                        <h3 className="text-lg font-semibold text-foreground">5. Termination</h3>
                        <p>
                            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
