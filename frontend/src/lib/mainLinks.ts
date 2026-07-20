import { LucideProps } from 'lucide-react';
import {MailCheck , GitGraph , Send} from 'lucide-react'


interface ILinks {
    name : string , 
    href : string , 
    icon : React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
  }

export const links : ILinks[] = [
    { name: 'Telegramm', href: 'https://t.me/AE86TRUENO4AGE112HPRWD' , icon: Send },
    { name: 'GitHub', href: 'https://github.com/suxxesz' , icon: GitGraph },
    { name: 'Freelance', href: 'https://www.upwork.com/freelancers/~014d53cdeff21d99d6' , icon: MailCheck } , 
  ] as const 