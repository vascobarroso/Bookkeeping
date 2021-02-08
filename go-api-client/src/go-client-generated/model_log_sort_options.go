/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Specifies the sorting requirements of a log request.
type LogSortOptions struct {
	Author *SortOrder `json:"author,omitempty"`
	CreatedAt *SortOrder `json:"createdAt,omitempty"`
	Id *SortOrder `json:"id,omitempty"`
	Tags *SortOrder `json:"tags,omitempty"`
	Title *SortOrder `json:"title,omitempty"`
}
