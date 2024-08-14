import { type FC, Fragment } from 'react'
import { getLabel, type GroupContent } from '~/utils'
import classNames from 'classnames'

export interface CodeContentProps {
  group: GroupContent
}
const CodeContent: FC<CodeContentProps> = ({ group }) => (
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
                  "tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto"
                )}
              >
                <pre>{item.content}</pre>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  </div>
)


export default CodeContent
