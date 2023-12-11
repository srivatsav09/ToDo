import { title } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card"
import { Chip } from "@nextui-org/chip"
import Image from "next/image"
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

export default function AboutPage() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-2 md:py-10 h-full">
			<Card shadow="lg">
				<CardBody>
					<p>Your First Todo</p>
				</CardBody>
			</Card>
			<Card shadow="lg">
				<CardBody>
					<p>need to finish painting the fence</p>
				</CardBody>
			</Card>
			<div className="flex flex-col justify-center gap-4 pt-4">
				<Button color="primary" href="/about" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
					<Link href="/about" color="foreground">
						Create a Todo
					</Link>
				</Button>
			</div>
		</section>
	);
}
