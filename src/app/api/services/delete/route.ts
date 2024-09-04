import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("🚀 ~ POST ~ request:", await request.json())
  // const service = await prisma.services.create({
  // data: {
  //   icon: 'ScaleIcon',
  //   title: 'Apoio Jurídico 2',
  //   description: 'Na nossa associação, defendemos os direitos dos nossos associados, fornecendo o apoiojurídico necessário para garantir o acesso ao remédio.'
  // },
  // })
  return NextResponse.json({message: 'Service created successfully'}, {status: 200});
}