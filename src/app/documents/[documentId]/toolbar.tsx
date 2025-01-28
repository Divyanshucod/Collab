'use client'
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ToolbarButtonProps {
    onClick?:()=>void,
    isActive?:boolean,
    icon: LucideIcon
}
const FontFamilyButton = ()=>{
    const {editor} = useEditorStore()

    const fonts = [
        {
            label:'Arial' , value:'Arial'
        },
        {
            label:'Times New Roman' , value:'Times New Roman'
        },
        {
            label:'Courier New' , value:'Courier New'
        },
        {
            label:'Georgia' , value:'Georgia'
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"> 
                    <span className="truncate">{editor?.getAttributes('textStyle').fontFamily || "Arial"}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/> 
                    </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
              {fonts.map(({label,value}) =>(
                <button onClick={()=> (editor?.chain().focus().setFontFamily(value).run())} key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                    editor?.getAttributes('textStyle').fontFamily === value && "bg-neutral-200/80"
                )}
                style={{fontFamily:value}}>
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
const ToolbarButton = ({onClick,isActive,icon:Icon}:ToolbarButtonProps)=>{
     return (
        <button onClick={onClick}
          className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
          )}>
            <Icon className="size-4"/>
        </button>
     )
} 

export const Toolbar= ()=>{
    const {editor} = useEditorStore()
    const sections:{
        label:string,
        icon:LucideIcon,
        onClick:()=>void,
        isActive?:boolean
    }[][] = [
        [
            {
                label:'Undo',
                icon:Undo2Icon,
                onClick:()=> editor?.chain().focus().undo().run()
                
            },
            {
                label:'Redo',
                icon:Redo2Icon,
                onClick:()=> editor?.chain().focus().redo().run()
                
            },
            {
                label:'Print',
                icon:PrinterIcon,
                onClick:()=> window.print()
                
            },
            {
                label:'Spell Check',
                icon:SpellCheckIcon,
                onClick:()=> {
                    const current = editor?.view.dom.getAttribute('spellcheck')
                    editor?.view.dom.setAttribute('spellcheck', current === "false" ? "true":"false")
                }
                
            }
        ],
        [
            {
                label:'Bold',
                icon:BoldIcon,
                onClick:()=> editor?.chain().focus().toggleBold().run(),
                isActive:editor?.isActive('bold')
            },
            {
                label:'Italic',
                icon:ItalicIcon,
                onClick:()=> editor?.chain().focus().toggleItalic().run(),
                isActive:editor?.isActive('italic')
            },
            {
                label:'Underline',
                icon:UnderlineIcon,
                onClick:()=> editor?.chain().focus().toggleUnderline().run(),
                isActive:editor?.isActive('underline')
            },
        ],
        [
            {
                label:'Comment',
                icon:MessageSquarePlusIcon,
                onClick:()=> console.log('ToDo: comment'),
                isActive:false //ToDo: Enable this functionality
            },
            {
                label:'List Todo',
                icon:ListTodoIcon,
                onClick:()=> editor?.chain().focus().toggleTaskList().run(),
                isActive:editor?.isActive('taskList')
            },
            {
                label:'Remove Formatting',
                icon:RemoveFormattingIcon,
                onClick:()=> editor?.chain().focus().unsetAllMarks().run(),
            },
        ]
    ]
   return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        {sections[0].map((item)=>(
             <ToolbarButton key={item.label} {...item}/>
        ))}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        <FontFamilyButton/>
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        { /* ToDo: heading*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        { /* ToDo: font size*/}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        {sections[1].map((item)=>(
             <ToolbarButton key={item.label} {...item}/>
        ))}
        { /* ToDo: text color*/}
        { /* ToDo: highlight color */}
        <Separator orientation='vertical' className='h-6 bg-neutral-300'/>
        { /* ToDo: Link*/}
        { /* ToDo: Image*/}
        { /* ToDo: align*/}
        { /* ToDo: line height */}
        { /* ToDo: List */}
        {sections[2].map((item)=>(
             <ToolbarButton key={item.label} {...item}/>
        ))}
    </div>
   )
}
