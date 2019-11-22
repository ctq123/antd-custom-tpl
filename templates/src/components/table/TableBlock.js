import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Pagination, Table } from 'antd'
import styles from './TableBlock.less'

/**
 * 对table组件和分页进行封装
 */
class TableBlock extends PureComponent {

  onShowSizeChange = (cur_page, page_size) => {
    const { searchCB } = this.props
    searchCB({ 
      pageNum: 1,
      pageSize: page_size 
    })
  }

  onPageChange = (page) => {
    const { searchCB, pageSize } = this.props
    searchCB({ 
      pageNum: page,
      pageSize,
    })
  }

  render() {
    const { list, columns, total, loading, rowKey, showTopBlock, leftTopNode, showBottomBlock, leftBottomNode, pageNum } = this.props
    return (
      <Fragment>
        {
          showTopBlock ?
          <div className={styles.between}>
            <div>{ leftTopNode }</div>
            <Pagination 
              className='pagination-right'
              showSizeChanger
              showTotal={total => `共 ${total} 条`}
              current={pageNum} 
              total={total} 
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange} />
          </div> : null
        }
        <Table bordered pagination={false} columns={columns} dataSource={list} rowKey={rowKey} loading={loading} />
        {
          showBottomBlock ?
          <div className={styles.between}>
            <div>{ leftBottomNode }</div>
            <Pagination 
              className='pagination-right'
              showSizeChanger
              showTotal={total => `共 ${total} 条`}
              current={pageNum} 
              total={total} 
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange} />
          </div> : null
        }
      </Fragment>
    )
  }
}

TableBlock.propTypes = {
  list: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  searchCB: PropTypes.func.isRequired,
}

TableBlock.defaultProps = {
  /**table数据 */
  list: [],
  /**table头 */
  columns: [],
  /**分页总条数 */
  total: 0,
  /**分页页码 */
  pageNum: 1,
  /**分页每页页数 */
  pageSize: 10,
  /**分页查询回调 */
  searchCB: () => {},
  loading: false,
  /**table每行key值 */
  rowKey: 'id',
  /**是否显示上分页区域 */
  showTopBlock: true,
  /**上分页-左上侧显示内容 */
  leftTopNode: null,
  /**是否显示下分页区域 */
  showBottomBlock: false,
  /**下分页-左下侧显示内容 */
  leftBottomNode: null,
}

export default TableBlock

