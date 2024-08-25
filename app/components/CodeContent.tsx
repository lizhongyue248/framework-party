import { type FC, Fragment } from "react"
import { getLabel, type GroupContent } from "~/utils"
import classNames from "classnames"
import { Copy } from "lucide-react"

export interface CodeContentProps {
  group: GroupContent
}

const CodeContent: FC<CodeContentProps> = ({ group }) => {
  return (
    <div>
      <div className="flex flex-col h-full">
        <h3 className={"font-bold"}>{getLabel(group.framework)}</h3>
        <div className={"not-prose"}>
          <div role="tablist" className="tabs tabs-lifted h-full">
            {group.files.map((item, index) => (
              <Fragment key={`${group.framework}-${item.value}`}>
                <input
                  type="radio"
                  name={group.key}
                  role="tab"
                  className="tab"
                  aria-label={item.label}
                  defaultChecked={index === 0}
                />
                <div
                  role="tabpanel"
                  className={classNames(
                    "tab-content bg-base-100 border-base-300 rounded-box overflow-hidden relative group"
                  )}
                >
                  <Copy
                    className={classNames(
                      "absolute right-0 top-0 cursor-pointer transition duration-300 opacity-0",
                      "group-hover:opacity-100 hover:bg-gray-100 p-2 hover:dark:bg-black/30",
                      "text-black/60 dark:text-white/60",
                      "tooltip"
                    )}
                    size={36}
                    onClick={async () => {
                      await navigator.clipboard.writeText(item.code)
                    }}
                  />
                  {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeContent
